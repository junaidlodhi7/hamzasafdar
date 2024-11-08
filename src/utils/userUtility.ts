export default function removePasswordField(userObject:any) {
    const { password, ...userWithoutPassword } = userObject;
    return userWithoutPassword;
  }