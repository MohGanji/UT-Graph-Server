const admins = ['mahdi.jahed', 'mhadih', 'arman.rostami'];

module.exports = username => {
  return admins.find(function (element) {
    return element === username;
  });
};
