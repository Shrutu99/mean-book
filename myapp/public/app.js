let app = angular.module('myApp',[])

app.controller('myCtrl', function($scope, $http){

    $scope.getBooks = function(){
        $http.get('/api/books').then(res => {
            $scope.books = res.data
        })
    }

    $scope.getBooks()

    //add new book
   $scope.addBook = function(){
    $http.post('/api/addBook', $scope.newBook)
    .then((res) => {
        console.log(res.data)
        $scope.getBooks()   // refresh table
        $scope.newBook = {} // clear form
    })
}

// edit book 
$scope.editBook = function(book){
    $scope.newBook = angular.copy(book)
    $scope.editMode = true
}


//update book
$scope.updateBook = function(){
    $http.put('/api/updateBook/' + $scope.newBook._id, $scope.newBook)
    .then(()=>{
        $scope.getBooks()
        $scope.newBook = {}
        $scope.editMode = false
    })
}

    //delete book
   $scope.deleteBook = function(id){
    console.log("Deleting Id:", id)

    $http.delete('/api/deleteBook/' +id)
    .then(()=>{
        $scope.getBooks()
    })
    .catch(err =>{
        console.log("Error deleting book:", err)
    })
   }
})