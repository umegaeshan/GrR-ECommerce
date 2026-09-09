import { Navigate } from 'react-router-dom';

// මේකෙන් කරන්නේ ඇතුළට යන්න දෙන පිටුව (children) පෙන්වන එකයි
const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('userInfo');

  // ලොගින් වෙලා නැත්නම් (user කෙනෙක් නැත්නම්) කෙලින්ම Login පිටුවට විසි කරනවා
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ලොගින් වෙලා ඉන්නවා නම් අදාළ පිටුව බලන්න දෙනවා
  return children;
};

export default ProtectedRoute;