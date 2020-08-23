import React from "react"

function HomePage() {
  return (
    <div className="home-page">
      <h1>Home Page</h1>
      <h2>
        Please go to <a href="/posts">posts</a> or{" "}
        <a href="/categories">categories</a>
      </h2>
    </div>
  )
}
export default HomePage
