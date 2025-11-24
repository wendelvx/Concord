exports.uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'Nenhum arquivo enviado ou formato inválido.' });
        }

        
        const fileUrl = `/uploads/${req.file.filename}`;

        res.status(201).json({ 
            message: 'Upload realizado com sucesso!',
            url: fileUrl 
        });

    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).json({ error: 'Erro ao processar o upload.' });
    }
};