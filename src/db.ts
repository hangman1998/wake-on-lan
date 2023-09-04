import Database from "tauri-plugin-sql-api";
let db: null | Database = null;

export type Machine = {
    name: string;
    address?: string;
    mac: string;
}

export async function connect(): Promise<Database> {
    if (!db) db = await Database.load("sqlite:main.db");
    return db;
}

export const getMachines = async () => {
    const db = await connect();
    return await db.select<Machine[]>("SELECT * FROM machine");
};


export const newMachine = async ({ name, address, mac }: Machine) => {
    const db = await connect();
    const repetitions = await db.select<number>("select count(*) from machine where name = $1 or mac = $2", [name, mac]);
    if (repetitions > 0) throw new Error("a machine with this name or mac address already exists!")
    else
        return await db.execute(
            "INSERT INTO machine (name,address,mac) VALUES ($1,$2,$3)",
            [name, address, mac]
        );
};

export const delMachine = async (name: string) => {
    const db = await connect();
    return await db.execute(
        "delete from machine where name = $1", [name]
    );
};