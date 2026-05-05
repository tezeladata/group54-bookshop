import {readFile} from "fs/promises";

const ReadFile = async db => {
    try {
        const data = await readFile(db, "utf8");
        return JSON.parse(data);
    } catch(err) {
        return {err}
    }
};

export default ReadFile