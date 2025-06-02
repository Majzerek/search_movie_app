import { ButtonNav } from "../../components"

export const NotFoundPage = () => {

  return (
    <div className="not-found">
      <h1>Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <ButtonNav id="btn_not_found" to={'/'}>Home</ButtonNav>
    </div>
  )
}
