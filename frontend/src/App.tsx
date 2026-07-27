import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import ImageToBase64Page from "./pages/ImageToBase64Page";
import FileToBase64Page from "./pages/FileToBase64Page";
import Base64ToFilePage from "./pages/Base64ToFilePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<ImageToBase64Page />} />
          <Route path="file-to-base64" element={<FileToBase64Page />} />
          <Route path="base64-to-file" element={<Base64ToFilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
