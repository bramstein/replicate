Usage:

    Replicator(options)

Where options is an object containing the following:

* `from`: The source database URL (can include username/password.) Required.
* `to`: The target database (can include username/password.) Required.
* `filter`: Function called before a document is added to the destination database. Return true if the document should be added, false if it should be skipped. The function is called with (id, rev) of each document. Optional.
* `since`: Change seq identifier to start from when doing continous replication. Optional.
* `mutation`: Not implemented?
