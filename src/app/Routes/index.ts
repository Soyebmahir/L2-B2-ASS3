import { CategoryRoutes } from "../modules/category/categroy.route";
import { CoursePostRoute, CourseRoute, } from "../modules/course/course.route";
import express from 'express'
import { ReviewRoutes } from "../modules/review/review.Route";

const router = express.Router()

const moduleRoutes = [
    {
        path: '/course',
        route: CoursePostRoute
    },
    {
        path: '/courses',
        route: CourseRoute
    },
    {
        path: '/categories',
        route: CategoryRoutes
    },
    {
        path: '/reviews',
        route: ReviewRoutes
    },
]

moduleRoutes.forEach(routes => {
    router.use(routes.path, routes.route)
})
export default router;