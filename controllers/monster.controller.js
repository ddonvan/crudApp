import { isValidObjectId } from "mongoose";
import { getMonstersFromRepository, getMonsterFromRepository, updateMonstersInRepository, deleteMonsterFromRepository, createMonsterInRepository } from "../repositories/monster.repository.js";

export const getMonsters = async (req, res) => {
    try {
        const monsters = await getMonstersFromRepository({});
        res.status(200).send(monsters);
    } catch (e) {
        res.status(500).send(e.message, 'failed to fetch a list of monsters');
    }
}

export const getMonster = async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)) {
        return res.status(400).send("Invalid monster id");
    }
    
    try { 
        const monster = await getMonsterFromRepository({ _id: id });
        res.status(200).send(monster);
    } catch (e) {
        console.error(e)
        res.status(500).send(e.message, `failed to fetch monster ${id}`);
    }
}

export const updateMonster = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    if(!isValidObjectId(id)) {
        return res.status(400).send("Invalid monster id");
    }

    if(!body || !body.name) {
        return res.status(400).send("Missing required fields: name");
    }

    try {
        const monster = await updateMonstersInRepository({ _id: id }, body);
        res.status(200).send(monster);
    } catch (e) {
        res.status(500).send(e.message, `failed to fetch monster ${id}`);
    }
}

export const deleteMonster = async (req, res) => {
    const { id } = req.params;

    if(!isValidObjectId(id)) {
        return res.status(400).send("Invalid monster id");
    }

    try {
        const monster = await deleteMonsterFromRepository({ _id: id });
        if (monster) {
            res.status(204).send();
        } else {
            res.status(404).send(e.message, `failed to delete monster ${id}`)
        }
    } catch (e) {
        res.status(500).send(e.message, `failed to delete monster ${id}`);
    }
}

export const createMonster = async (req, res) => {
    const { body } = req;

    if(!body || !body.name) {
        return res.status(400).send("Missing required fields: name");
    }

    try {
        const monster = await createMonsterInRepository(body);
        console.log(monster);
        res.status(200).send(monster);
    } catch (e) {
        res.status(500).send(e.message, `failed to fetch monster ${id}`);
    }
}