import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import SiteSignUp from "./pages/SiteSignUp";
import PublicarNoticia from "./pages/PublicarNoticia/PublicarNoticia";
import NoticiasPublicadas from "./pages/NoticiasPublicadas/NoticiasPublicadas";
import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import Noticia from "./pages/Noticia/Noticia";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/register_site" element={<SiteSignUp />} />
          <Route
            path="/publicar-noticia"
            element={
              user && user.user_type === 2 ? (
                <PublicarNoticia />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
          <Route path="/noticia/:id" element={<Noticia />} />
          <Route
            path="/noticias-publicadas"
            element={
              user && user.user_type === 2 ? (
                <NoticiasPublicadas />
              ) : (
                <Navigate to={"/"} />
              )
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
