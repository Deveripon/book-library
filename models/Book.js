import mongoose from "mongoose";
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
        },
        writer: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Writer",
        },
        published_date: {
            type: String,
        },
        cover_photo: {
            type: String,
        },
        status: {
            type: Boolean,
            default: true,
        },
        trash: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);
export const Book = mongoose.model("Book", bookSchema);
