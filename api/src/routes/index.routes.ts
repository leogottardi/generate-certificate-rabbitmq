import { Router } from 'express'
import { generateCertificateService } from '../infra/containers/index'
const router = Router()
router.get("/generate-certificate", async (req, res) => {
    const { name, email, cpf } = req.query
    await generateCertificateService.handler({
        name: String(name),
        email: String(email),
        cpf: String(cpf)
    })
    return res.json('certificate generated')
})

export { router }