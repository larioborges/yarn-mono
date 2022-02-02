#! /bin/bash
__initTempDir=../temp

s3SyncTempDirWithMetadata () {
    cacheControl="$1"
    echo $bucketname
    if [ -n $cacheControl ]; then
        aws s3 sync $__initTempDir s3://$bucketname --cache-control "$cacheControl"
    else
        aws s3 sync $__initTempDir s3://$bucketname
    fi

    rm -r $__initTempDir
}


stripRelativePath () {
    filePath=$1
    relativePrefix='./'

    sPath=${filePath#"$relativePrefix"}

    echo "$sPath"
}

mvFileToTemp () {
    filePath=$1
    DIR="$(dirname "${filePath}")";
    FILE="$(basename "${filePath}")"

    strippedPath=$(stripRelativePath $DIR)

    tempPath="$__initTempDir"

    if [ "$strippedPath" != '.' ];
        then
            tempPath="$tempPath/$strippedPath"

            if [ ! -d "$tempPath" ];
                then
                    echo Creating Dir $tempPath;
                    mkdir -p $tempPath;
            fi
    fi
    tempPath="$tempPath/$FILE";

    mv $filePath $tempPath;
}

cpFilesToBucket () {
    directory="$1"
    fileExtenstionWildcard="$2"
    cacheControlMetadata="$3"
    echo "============================================="
    echo "Sync" ${fileExtenstionWildcard@Q} "Artifacts in ${directory@Q} to S3 Bucket"
    echo "============================================="

    if [ ! -d $__initTempDir ]; then
        mkdir -p $__initTempDir;
    fi

    if [[ -n $fileExtenstionWildcard ]]; then
            for fileName in $( find $directory -name "$fileExtenstionWildcard" -type f ); do
                mvFileToTemp $fileName
            done

        else
            for fileName in $( find $directory -type f ); do
                mvFileToTemp $fileName
            done
    fi

    s3SyncTempDirWithMetadata $cacheControlMetadata
}

environment=staging

while getopts e: flag
do
    case "${flag}" in
        e) environment=${OPTARG};;
    esac
done

echo "Environment: $environment";

if [ $environment != "staging" ] && [ $environment != "preprod" ] && [ $environment != "prod" ] && [ $environment != "local" ]; then
    echo "Environment can only be staging, preprod, prod or local"
    exit
fi

echo "============================================="
echo "Yarn Install"
echo "============================================="
yarn install

echo "============================================="
echo "Yarn Build"
echo "============================================="
yarn build-${environment}

echo "============================================="
echo "Sync Build Artifacts to S3 Bucket"
echo "============================================="
bucketname=xos-$environment
echo "Syncing to bucket: " $bucketname

echo "Drop Bucket Contents"
aws s3 rm s3://$bucketname --recursive
cd ./public

#HTML
cpFilesToBucket '.' '*.html' "public,max-age=0,must-revalidate"

# App Data
cpFilesToBucket '.' 'app-data.json' "public,max-age=0,must-revalidate"

#Page Data
cpFilesToBucket './page-data' '*.json' "public,max-age=0,must-revalidate"


# Static
cpFilesToBucket './static' '' "public,max-age=31536000,immutable"

# sw.js
cpFilesToBucket '.' 'sw.js' "public,max-age=0,must-revalidate"

# Js
cpFilesToBucket '.' '*.js' "public,max-age=31536000,immutable"

# Css
cpFilesToBucket '.' '*.css' "public,max-age=31536000,immutable"

# Public Dir
cpFilesToBucket '.' '' ''
