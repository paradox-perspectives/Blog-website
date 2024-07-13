import './App.css';
import Articles from "./components/article/view/Articles";
import {HashRouter, Route, Routes} from 'react-router-dom';
import CreateArticle from "./components/article/add/CreateArticle";
import Article from "./components/article/view/Article";
import Login from "./components/Login";
import HomeSecure from "./components/secure/HomeSecure";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import AuthProvider from "react-auth-kit";
import createStore from 'react-auth-kit/createStore';
import NotFound from './components/NotFound';
import NavBar  from './components/NavBar';
import NavBar2  from './components/Nav2';
import EditArticles from "./components/secure/EditArticles";
import Publish from "./components/secure/Publish";
import ViewArticles from "./components/secure/ViewArticles";
import EmailsView from "./components/secure/EmailsView";
import ContactPage from "./components/ContactPage";
import ComingSoonPage from "./components/ComingSoonPage";
import ArticleAdded from "./components/article/add/ArticleAdded";


function App() {
    const store = createStore({
        authName:'_auth',
        authType:'cookie',
        cookieDomain: window.location.hostname,
        cookieSecure: false
    })

    return (
        <div className="App pt-24" >
            <HashRouter>
                <NavBar className="navbar"/>
                    <div className="main-content">
                        <AuthProvider store={store}>
                            <Routes>
                                <Route path="/" element={<Articles/>}/>
                                <Route path="/login" element={<Login/>}/>
                                <Route path="/articles/:urlId" element={<Article/>}/>
                                <Route path="/contact" element={<ContactPage/>}/>
                                <Route path="/shop" element={<ComingSoonPage/>}/>

                                <Route path="/secure" element={
                                    <RequireAuth fallbackPath="/login">
                                        <HomeSecure/>
                                    </RequireAuth>
                                }/>
                                <Route path="/add" element={
                                    <RequireAuth fallbackPath="/login">
                                        <CreateArticle/>
                                    </RequireAuth>
                                    }/>
                                <Route path="/added" element={
                                    <RequireAuth fallbackPath="/login">
                                        <ArticleAdded/>
                                    </RequireAuth>
                                }/>
                                <Route path="/edit/:urlId" element={
                                    <RequireAuth fallbackPath="/login">
                                        <CreateArticle edit={true}/>
                                    </RequireAuth>
                                }/>
                                <Route path="/edit" element={
                                    <RequireAuth fallbackPath="/login">
                                        <EditArticles/>
                                    </RequireAuth>
                                }/>
                                <Route path="/publish" element={
                                    <RequireAuth fallbackPath="/login">
                                        <Publish/>
                                    </RequireAuth>
                                }/>
                                <Route path="/view/:urlId" element={
                                    <RequireAuth fallbackPath="/login">
                                        <Article hide={false}/>
                                    </RequireAuth>
                                }/>
                                <Route path="/view" element={
                                    <RequireAuth fallbackPath="/login">
                                        <ViewArticles/>
                                    </RequireAuth>
                                }/>
                                <Route path="/emails" element={
                                    <RequireAuth fallbackPath="/login">
                                        <EmailsView/>
                                    </RequireAuth>
                                }/>
                                <Route path="*" element={<NotFound/>}/>
                            </Routes>
                        </AuthProvider>
                    </div>
            </HashRouter>
        </div>
);

}

export default App;
