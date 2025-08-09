import ThemeProvider from "./context/ThemeProvider";
import {
  Header,
  About,
  Skills,
  Projects,
  Contact,
  Footer,
} from "./components/layout/";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="overflow-x-hidden">
          <Header></Header>
          <About></About>
          <Skills></Skills>
          <Projects></Projects>
          <Contact></Contact>
          <Footer></Footer>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
