import Logo from '../assets/react.svg'

export const ReactLogo = () => {
  return (
   <img 
    src={Logo} 
    alt="React" 
    style={{
        position: 'fixed', 
        bottom: '20px', 
        right:'20px', 
        width:'130px',
        
    }} 
    />
  )
}
