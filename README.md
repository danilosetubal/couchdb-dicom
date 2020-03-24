# DICOM in CouchDB

Convert and persist [DICOM](https://en.wikipedia.org/wiki/DICOM) files in CouchDB.

## Prerequisites
- NodeJS 12.0 or latest;
- CouchDB 3.0 or latest;
- Docker 19.0 or latest;

Clone this repository locally and follow below steps.

## Running
Enter the commands below in Bash (Linux) or Windows PowerShell (Windows).
1. Run CouchDB instance (skip this step if you already have a running CouchDB instance):
    1. ```docker pull couchdb ```
    2. ```docker volume create couchdb-vol```
    3. ```docker run -v couchdb-vol:/opt/couchdb/data -e COUCHDB_USER=admin -e COUCHDB_PASSWORD=admin -p 5984:5984 -d couchdb```
    4. Access `http://localhost:5984/_utils` and verify if is CouchDB is running.
    
2. Install project dependecies:
    - ```npm install```

3. Run migrate script:
    - ```npm run dicom:migrate```
    
4. Access `http://localhost:5984/_utils/#database/dicom_db/_all_docs` to verify documents.