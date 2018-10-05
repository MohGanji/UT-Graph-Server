const admins = ['mahdi.jahed', 'hadi.hojjat', 'arman.rostami'];

module.exports = username => {
  return admins.find(function (element) {
    return element === username;
  });
};
