import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes,publicRoutes} from "../../router";
import { useAuth0 } from '@auth0/auth0-react';

const AppRouter = () => {

    const {isAuthenticated} = useAuth0()

    return (
            isAuthenticated
        ?
            <Switch>
                {privateRoutes.map(route =>

                 <Route
                    component = {route.component}
                    path = {route.path}
                    exact = {route.exact}
                    key = {route.path}
                 />
                )}
            <Redirect to='/userpage'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route =>

                    <Route
                        component = {route.component}
                        path = {route.path}
                        exact = {route.exact}
                        key = {route.path}
                    />
                    )}
            <Redirect to='/registerpage'/>
            </Switch>

    );
};

export default AppRouter;