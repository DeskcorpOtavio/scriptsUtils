import { exec } from "child_process";
import { promisify } from "util";
import * as path from "path";
import * as dotenv from "dotenv";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const execAsync = promisify(exec);

interface GitProfile {
  name: string;
  email: string;
  sshKeyPath?: string | undefined;
}

const profiles: Record<string, GitProfile> = {
  pessoal: {
    name: process.env.GIT_PESSOAL_NAME!,
    email: process.env.GIT_PESSOAL_EMAIL!,
    sshKeyPath: process.env.GIT_PESSOAL_SSH_KEY,
  },
  trabalho: {
    name: process.env.GIT_TRABALHO_NAME!,
    email: process.env.GIT_TRABALHO_EMAIL!,
    sshKeyPath: process.env.GIT_TRABALHO_SSH_KEY,
  },
};

async function switchGitProfile(profileName: string) {
  const profile = profiles[profileName];

  if (!profile) {
    console.error(`❌ Perfil "${profileName}" não encontrado.`);
    console.log(`💡 Perfis disponíveis: ${Object.keys(profiles).join(", ")}`);
    process.exit(1);
  }

  if (!profile.name || !profile.email) {
    console.error(
      `❌ Variáveis de ambiente para o perfil "${profileName}" não configuradas no .env.`,
    );
    process.exit(1);
  }

  try {
    await execAsync(`git config --global user.name "${profile.name}"`);
    await execAsync(`git config --global user.email "${profile.email}"`);

    if (profile.sshKeyPath) {
      await execAsync(
        `git config --global core.sshCommand "ssh -i ${profile.sshKeyPath} -F /dev/null"`,
      );
      console.log(`🔑 Chave SSH configurada: ${profile.sshKeyPath}`);
    } else {
      await execAsync(`git config --global --unset core.sshCommand`).catch(
        () => {},
      );
    }

    console.log(
      `\n✅ Sucesso! Credenciais alteradas para o perfil: [${profileName.toUpperCase()}]`,
    );
    console.log(`👤 Nome:  ${profile.name}`);
    console.log(`📧 Email: ${profile.email}\n`);
  } catch (error) {
    console.error(
      "❌ Ocorreu um erro ao tentar alterar as credenciais:",
      error,
    );
  }
}

const targetProfile = process.argv[2];

if (!targetProfile) {
  console.log(
    "⚠️ Uso correto: ts-node switchGitCredencials.ts <nome-do-perfil>",
  );
  console.log("Exemplo: ts-node switchGitCredencials.ts trabalho");
  process.exit(1);
}

switchGitProfile(targetProfile);
