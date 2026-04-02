import { poolDB } from "../config/database"
import { RowDataPacket } from "mysql2"

interface UserRow extends RowDataPacket {
    id: number | string
    fullName: string
    email: string
    phone: string
    image: string
    password: string
}

interface CreateUserInput {
    fullName?: string
    email: string
    phone?: string
    image?: string
    id: number | string
    password: string
}

interface UpdateUserInput {
    fullName?: string
    email?: string
    phone?: string
    image?: string
    password?: string
}

const userModel = {
    async create(userData: CreateUserInput) {
        const { fullName, email, phone, image, id, password } = userData;

        await poolDB.execute(`
            INSERT INTO users (fullName, email, phone, image, id, password )
            VALUES (?, ?, ?, ?, ?, ?)`, [fullName || "", email, phone || "", image || "", id, password]);

        const [rows] = await poolDB.execute<UserRow[]>(`SELECT * FROM users WHERE id = ?`, [id]);
        if (!rows[0]) throw new Error("user not found")
        return rows[0];
    },

    // get user by id
    async findById(id: string | number) {
        const [rows] = await poolDB.execute<UserRow[]>(`SELECT fullName, email, phone, image, id, password FROM users WHERE id=?`, [id]);
        if (!rows[0]) throw new Error("user not found")
        return rows[0];
    },

    // get user by email
    async findByEmail(email: string) {
        const [rows] = await poolDB.execute<UserRow[]>(
            `SELECT fullName, email, phone, image, id, password FROM users WHERE email=?`, [email]
        );
        if (!rows[0]) throw new Error("user not found")
        return rows[0];
    },

    // update user
    async update(id:string | number, updateData:UpdateUserInput){

        const fields = [];
        const values = [];

        Object.keys(updateData).forEach((key)=>{
            if(updateData[key] !== undefined){
                fields.push(`${key} = ?`);
                values.push(updateData[key]);
            }
        });
        if(fields.length === 0){
             throw new Error("No fields to update");
        };


        // Add updated time
        fields.push(`updated_at = CURRENT_TIMESTAMP`);
        values.push(id);

        const sql = `UPDATE users SET ${fields.join(", ")} WHERE id=?`;

        const [result] = await poolDB.execute(sql, values);
       if (result.affectedRows === 0) {
            return null;
        }
        const [rows] = await poolDB.execute<UserRow[]>(`SELECT * FROM users WHERE id = ?`, [id]);
        if (!rows[0]) throw new Error("user not found");
         return rows[0];
    },

    // delete user
    async delete(id: string | number) {
        const [rows] = await poolDB.execute<UserRow[]>(`SELECT * FROM users WHERE id = ?`, [id]);
        if (!rows[0]) throw new Error("user not found")

        await poolDB.execute(`DELETE FROM users WHERE id = ?`, [id]);
        return { message: "User deleted successfully" };
    },

    // get all users
    async findAll() {
        const [rows] = await poolDB.execute<UserRow[]>(`SELECT fullName, email, phone, image, id, password FROM users`);
        return rows;
    }

}

export default userModel;