import "./MainBanner.css"

export default function MainBanner({text = "抹茶 Matcha Mart"}) {
  return(
    <div className="convenience-banner">
      <div className="stripes left-stripes">
        <div className="stripe one"></div>
        <div className="stripe two"></div>
        <div className="stripe three"></div>
      </div>
      
      <div className="banner-text">
        {text}
      </div>
      
      <div className="stripes right-stripes">
        <div className="stripe one"></div>
        <div className="stripe two"></div>
        <div className="stripe three"></div>
      </div>
    </div>
  )
}