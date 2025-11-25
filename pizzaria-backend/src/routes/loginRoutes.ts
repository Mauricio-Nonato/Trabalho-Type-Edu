import { Router } from "express";
import { loginCliente } from "../service/clientesServices.js";
import { loginProprietario } from "../service/propietarioService.js";

const router = Router();

router.post("/cliente", async(req,res)=>{
    try{
        const { username,password } = req.body;
        const result = await loginCliente(username,password);
        res.json(result);
    }catch(err:any){
        res.status(401).json({ error: err.message });
    }
});

router.post("/proprietario", async(req,res)=>{
    try{
        const { username,password } = req.body;
        const result = await loginProprietario(username,password);
        res.json(result);
    }catch(err:any){
        res.status(401).json({ error: err.message });
    }
});

export default router;
