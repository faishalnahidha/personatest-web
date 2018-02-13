export function getFirstName(name) {
  if (!name) return false;

  const splitedName = name.split(' ');
  const firstName = splitedName[0];

  return firstName;
}
