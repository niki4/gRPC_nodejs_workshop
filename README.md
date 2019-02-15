# gRPC_nodejs_workshop
gRPC service and client written on Node.js

This code was created after following the [Building a gRPC service with Node.js](https://codelabs.developers.google.com/codelabs/cloud-grpc/index.html) codelab released at Google Cloud Platform Events. Basically, you can follow the guide and create almost the same server/client.

The service provides simple CRUDL (albeit without 'U'pdate) via gRPC API for some Books storage. Another interesting feature is 'watch', allowing one client to be connected to service and watching in streaming mode if another clients have sent requests to insert a new Book.

# Installation
To run both service and client you'll need to [node.js](https://nodejs.org/en/download/) installed on your local or remote computer (where you're going to run them).

# Run
Client supports CLI, that means you can run it and pass args directly from your shell.

To run server simply invoke it like:
```bash
$ node server.js
(node:6696) DeprecationWarning: grpc.load: Use the @grpc/proto-loader module with grpc.loadPackageDefinition instead
```

Get Book by ID:
```bash
$ node client.js get 123
{ id: 123,
  title: 'A Tale of Two Cities',
  author: 'Charles Dickens' }
```

Create new Book:
```bash
$ node client.js insert 1 "A title" "Author Name"
{}

```

List all Books:
```bash
$ node client.js list
{ books:
   [ { id: 123,
       title: 'A Tale of Two Cities',
       author: 'Charles Dickens' },
     { id: 1, title: 'A title', author: 'Author Name' } ] }
```
