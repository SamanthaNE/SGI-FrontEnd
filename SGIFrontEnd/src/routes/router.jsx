import { RouteObject } from "react-router-dom";
//import Login from "@components/Login/Login";
import { EnumRoles } from "./roles";
import { Navigate } from "react-router-dom";
//import Authenticated from "@components/Authenticated";
import { routes as routesWorker } from "@features/Modulo4/routes/router";
import { routes as routesResearcher } from "@features/Modulo3/routes/router";

const defaultRoutes = [
	{
		path: "/",
		element: <Navigate to={"/"} replace />
	},
    /*
	{
		path: "login",
		element: (
			<Authenticated
				allowedRoles={[
					EnumRoles.WORKER,
                    EnumRoles.RESEARCHER
				]}>
				<Login />
			</Authenticated>
		)
	}
    */
];

// HERE MERGE ALL GROUPS ROUTER
const routes = defaultRoutes.concat(routesWorker).concat(routesResearcher)

const router = [
	{
		path: "/",
		children: routes
	}
];

export default router;