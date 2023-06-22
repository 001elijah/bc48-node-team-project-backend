function detectScreenSize(req, res, next) {
  const userAgent = req.headers['user-agent'];
  const screenSize = getScreenSize(userAgent);

  req.screenSize = screenSize;
  next();
}

function getScreenSize(userAgent) {
  const mobileKeywords = ['Mobi', 'Android', 'iPhone', 'iPad', 'Windows Phone'];
  const tabletKeywords = ['Tablet', 'iPad'];
  const isMobile = mobileKeywords.some((keyword) => userAgent.includes(keyword));
  const isTablet = tabletKeywords.some((keyword) => userAgent.includes(keyword));

  if (isMobile) {
    return 'mobile';
  } else if (isTablet) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}

module.exports = { detectScreenSize };