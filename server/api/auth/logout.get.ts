import { deleteCookie, sendRedirect } from "#imports"

export default defineEventHandler((event) =>{
    deleteCookie(event, 'token')
    return { success: true }
})