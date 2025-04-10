import { z } from "zod";

export const addDocument = z.object({
    n_Documento: z.string({
        required_error: 'el numero de documento es requerido',
        invalid_type_error: 'el tipo de n_Documento es string'
    }),
    name_Documento: z.string({
        required_error: 'el nombre de documento es requerido',
        invalid_type_error: 'el tipo de name_Documento es string'
    }),
    fecha_Documento: z.string({
        required_error: 'la fecha de documento es requerido',
        invalid_type_error: 'el tipo de fecha_Documento es string'
    }),
    type_Document: z.string({
        required_error: 'el tipo de documento es requerido',
        invalid_type_error: 'el tipo de type_Document es string'
    }),
    img_Document: z.string({
        invalid_type_error: 'el tipo de img_Document es string'
    }).optional()
})
