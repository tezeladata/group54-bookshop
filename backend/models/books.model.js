import mongoose from "mongoose";

const booksSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Book's title is required!"],
            trim: true
        },
        author: {
            fullname: {
                type: String,
                required: [true, "Author's fullname is required!"],
                trim: true
            },
            nationality: {
                type: String,
                required: [true, "Author's nationality is required!"],
                trim: true
            },
        },
        category: {
            type: String,
            required: [true, "Book's category is required!"],
            trim: true
        },
        price: {
            type: Number,
            required: [true, "Book's price is required!"],
        },
        stockQuantity: {
            type: Number,
            required: [true, "Book's stock is required!"],
        },
        tags: {
            type: Array,
            required: [true, "Book's tags are required!"],
            minLength: 2
        },
        reviews: [
            {
                username: {
                    type: String,
                    required: [true, "Reviewer's username is required!"],
                    trim: true
                },
                rating: {
                    type: Number,
                    required: [true, "Reviewer's rating is required!"],
                },
                comment: {
                    type: String,
                    required: [true, "Reviewer's comment is required!"],
                    trim: true
                }
            }
        ],
        images: [{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }]
    }, {
        timestamps: true
    }
);

const Books = mongoose.model("books", booksSchema);
export default Books;