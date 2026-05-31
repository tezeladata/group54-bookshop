import { useBooks } from "../context/books.context.jsx";

const Books = () => {
    const {books} = useBooks();

    return (
        <section>
            <h1>Books</h1>

            <section>
                {
                    books.map((book, ind) => (
                        <div key={ind}>
                            <h2>{book.title}</h2>
                            <p>Author: {book.author.fullname}, nationality: {book.author.nationality}</p>
                            <p>Category: {book.category}</p>
                            <b> Tags:
                                {
                                    book.tags.join(" ")
                                }
                            </b>

                            <div>
                                <h3>Images of book:</h3>
                                {
                                    book.images.map((imgObj, ind) => (
                                        <img src={imgObj.url} key={ind} />
                                    ))
                                }
                            </div>

                            <div>
                                <span>Stock: {book.stockQuantity}</span>
                                <span>Price: {book.price}</span>
                            </div>

                            <div>
                                <h2>Reviews:</h2>

                                {
                                    book.reviews.map((review, ind) => (
                                        <div key={ind}>
                                            <p>Username: {review.username}</p>
                                            <h3>{review.comment}</h3>
                                            <p>Rating: {review.rating}</p>
                                        </div>    
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </section>
        </section>
    )
};

export default Books;