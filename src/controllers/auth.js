import User from '../models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const register = async (req, res) => {
  const { name, email, password, role, secret } = req.body;

  try {
    if (role === 'empleado' && !email.endsWith('@efybit.com')) {
      return res.status(400).json({ message: 'Los empleados deben usar un correo @efybit.com' });
    }

    if (role === 'admin' && !email.endsWith('@adminefybit.com')) {
      return res.status(400).json({ message: 'Los admins deben usar un correo @adminefybit.com' });
    }

    const empleadoKey = 'empleado-key-120708';
    const adminKey = 'admin-key-3003010';

    if (role === 'empleado' && secret !== empleadoKey) {
      return res.status(401).json({ message: 'Palabra clave incorrecta para empleado' });
    }

    if (role === 'admin' && secret !== adminKey) {
      return res.status(401).json({ message: 'Palabra clave incorrecta para admin' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    if (user.role !== role) {
      return res.status(403).json({ message: 'No tiene permisos para acceder como ' + role });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
