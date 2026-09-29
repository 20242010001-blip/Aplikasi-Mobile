import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');
  const passwordInput = useRef<TextInput>(null);

  const handleLogin = () => {
    if (!email.trim()) {
      setError('Masukkan email Anda.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Gunakan format email yang valid.');
      return;
    }

    if (!password) {
      setError('Masukkan password Anda.');
      return;
    }

    setError('');
    Alert.alert('Login belum tersedia', 'Hubungkan aplikasi ke layanan SIAKAD kampus untuk masuk.');
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <View style={styles.brandRow}>
            <View style={styles.brandMark}>
              <Text style={styles.brandInitial}>U</Text>
            </View>
            <View>
              <Text style={styles.brandName}>UNIKU</Text>
              <Text style={styles.brandCaption}>UNIVERSITAS KUNINGAN</Text>
            </View>
          </View>

          <View style={styles.headingBlock}>
            <Text style={styles.eyebrow}>SISTEM INFORMASI AKADEMIK</Text>
            <Text style={styles.heading}>Selamat datang</Text>
            <Text style={styles.description}>Masuk untuk melanjutkan ke akun akademik Anda.</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Username (Email)</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(value) => {
                setEmail(value);
                setError('');
              }}
              placeholder="nama@email.com"
              placeholderTextColor="#929A95"
              autoCapitalize="none"
              autoComplete="email"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() => passwordInput.current?.focus()}
              accessibilityLabel="Username (Email)"
            />

            <Text style={[styles.label, styles.passwordLabel]}>Password</Text>
            <View style={styles.passwordField}>
              <TextInput
                ref={passwordInput}
                style={styles.passwordInput}
                value={password}
                onChangeText={(value) => {
                  setPassword(value);
                  setError('');
                }}
                placeholder="Masukkan password"
                placeholderTextColor="#929A95"
                secureTextEntry={!passwordVisible}
                autoCapitalize="none"
                autoComplete="password"
                returnKeyType="go"
                onSubmitEditing={handleLogin}
                accessibilityLabel="Password"
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible((visible) => !visible)}
                accessibilityRole="button"
                accessibilityLabel={passwordVisible ? 'Sembunyikan password' : 'Tampilkan password'}
                style={styles.visibilityButton}
              >
                <Text style={styles.visibilityText}>{passwordVisible ? 'Sembunyikan' : 'Tampilkan'}</Text>
              </TouchableOpacity>
            </View>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleLogin}
              accessibilityRole="button"
              accessibilityLabel="Masuk"
            >
              <Text style={styles.loginButtonText}>Masuk</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>PORTAL AKADEMIK UNIKU</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    paddingVertical: 36,
  },
  content: {
    width: '100%',
    maxWidth: 440,
    alignSelf: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 56,
  },
  brandMark: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#176B4D',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  brandInitial: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  brandName: {
    color: '#173D30',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
  },
  brandCaption: {
    color: '#738078',
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 0,
    marginTop: 3,
  },
  headingBlock: {
    marginBottom: 32,
  },
  eyebrow: {
    color: '#9A762A',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 12,
  },
  heading: {
    color: '#1C3028',
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: 0,
    marginBottom: 9,
  },
  description: {
    color: '#69746D',
    fontSize: 14,
    lineHeight: 21,
  },
  form: {
    width: '100%',
  },
  label: {
    color: '#35443C',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 9,
  },
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#DCE2DC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    color: '#1C3028',
    fontSize: 15,
  },
  passwordLabel: {
    marginTop: 22,
  },
  passwordField: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DCE2DC',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  passwordInput: {
    flex: 1,
    minWidth: 0,
    height: 52,
    paddingLeft: 15,
    color: '#1C3028',
    fontSize: 15,
  },
  visibilityButton: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 13,
  },
  visibilityText: {
    color: '#176B4D',
    fontSize: 12,
    fontWeight: '600',
  },
  errorText: {
    color: '#B33B32',
    fontSize: 13,
    marginTop: 11,
  },
  loginButton: {
    height: 54,
    borderRadius: 8,
    backgroundColor: '#176B4D',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 26,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    color: '#89928C',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 42,
  },
});
