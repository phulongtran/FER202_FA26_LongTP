import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        {/* TODO-08: Hiển thị logo image, appName, copyright, version, course */}
        <img
  src={about.logo}
  alt="logo"
  width="24"
  height="24"
/>

<h5 className="mt-2">
  {about.appName}
</h5>

<p className="mb-1">
  {about.copyright}
</p>

<p className="mb-1">
  Version: {about.version}
</p>

<p className="mb-0">
  {about.course}
</p>
      </div>
    </footer>
  )
}
