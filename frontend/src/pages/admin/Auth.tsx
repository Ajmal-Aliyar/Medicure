import AuthForm from "../../components/admin/common/AuthForm"


interface AuthProps {
    role: string;
  }
  
  const Auth:React.FC<AuthProps> = ({role}) => {
    
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <AuthForm role={role}/>
        </div>
    )
}

export default Auth
