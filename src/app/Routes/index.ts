import { CourseRoutes } from "../modules/course/course.route";
import express from 'express'

const router = express.Router()

const moduleRoutes = [
    {
        path: '/course',
        route: CourseRoutes
    }
]

moduleRoutes.forEach(routes => {
    router.use(routes.path, routes.route)
})
export default router;