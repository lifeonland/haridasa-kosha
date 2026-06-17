/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'i.pinimg.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'blogger.googleusercontent.com' },
      { protocol: 'https', hostname: 'anandsp1.wordpress.com' },
      { protocol: 'https', hostname: 'i1.sndcdn.com' },
      { protocol: 'https', hostname: 'cdn.umath.in' },
      { protocol: 'https', hostname: 'd18x2uyjeekruj.cloudfront.net' },
      { protocol: 'https', hostname: 'encrypted-tbn0.gstatic.com' },
      { protocol: 'https', hostname: 'www.sripadarajamutt.org' },
    ],
  },
}

module.exports = nextConfig
