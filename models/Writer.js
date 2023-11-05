import mongoose from "mongoose";

const writerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
        },
        bio: {
            type: String,
        },
        avater: {
            type: String,
            default: "avater.png",
        },
        books: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: "Book",
            default: [],
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
writerSchema.statics = {
    isActive: function () {
        return this.find({ status: true });
    },
    isTrashed: function () {
        return this.find({ $and: [{ status: false }, { trash: true }] });
    },
};
writerSchema.query = {
    isActive: function () {
        return this.where({ status: true });
    },
};
writerSchema.methods = {
    getNameOnly: function () {
        return this.select("name");
    },
};
writerSchema.virtual("isActive").get(function () {
    if (this.status === true) {
        return true;
    } else {
        return false;
    }
});
writerSchema.pre("save", function (next) {
    console.log("im from pree");
    next();
});
writerSchema.post("save", function (doc, next) {
    console.log(doc);
    console.log("im from post");
    next();
});
export const Writer = mongoose.model("Writer", writerSchema);
