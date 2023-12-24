import * as vscode from "vscode";
import {getSession} from "../auth/auth";
import {canReachGitHubAPI} from "../api/canReachGitHubAPI";
import {getGitHubContext} from "../git/repository";

export function registerSignIn(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand("github-actions.sign-in", async () => {
      const session = await getSession(true);
      if (session) {
        const canReachAPI = await canReachGitHubAPI();
        const ghContext = await getGitHubContext();
        const hasGitHubRepos = ghContext && ghContext.repos.length > 0;

        await vscode.commands.executeCommand("setContext", "github-actions.signed-in", true);
        await vscode.commands.executeCommand("setContext", "github-actions.internet-access", canReachAPI);
        await vscode.commands.executeCommand("setContext", "github-actions.has-repos", hasGitHubRepos);
      }
    })
  );
}
---BEGIN CERTIFICATE-----
MIIDdTCCAl2gAwIBAgILAgAAAAAA1ni3lAUwDQYJKoZIhvcNAQEEBQAwVzELMAkG
A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv
b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw05ODA5MDExMjAw
MDBaFw0xNDAxMjgxMjAwMDBaMFcxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i
YWxTaWduIG52LXNhMRAwDgYDVQQLEwdSb290IENBMRswGQYDVQQDExJHbG9iYWxT
aWduIFJvb3QgQ0EwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQDaDuaZ
jc6j40+Kfvvxi4Mla+pIH/EqsLmVEQS98GPR4mdmzxzdzxtIK+6NiY6arymAZavp
xy0Sy6scTHAHoT0KMM0VjU/43dSMUBUc71DuxC73/OlS8pF94G3VNTCOXkNz8kHp
1Wrjsok6Vjk4bwY8iGlbKk3Fp1S4bInMm/k8yuX9ifUSPJJ4ltbcdG6TRGHRjcdG
snUOhugZitVtbNV4FpWi6cgKOOvyJBNPc1STE4U6G7weNLWLBYy5d4ux2x8gkasJ
U26Qzns3dLlwR5EiUWMWea6xrkEmCMgZK9FGqkjWZCrXgzT/LCrBbBlDSgeF59N8
9iFo7+ryUp9/k5DPAgMBAAGjQjBAMA4GA1UdDwEB/wQEAwIABjAdBgNVHQ4EFgQU
YHtmGkUNl8qJUC99BM00qP/8/UswDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0B
AQQFAAOCAQEArqqf/LfSyx9fOSkoGJ40yWxPbxrwZKJwSk8ThptgKJ7ogUmYfQq7
5bCdPTbbjwVR/wkxKh/diXeeDy5slQTthsu0AD+EAk2AaioteAuubyuig0SDH81Q
gkwkr733pbTIWg/050deSY43lv6aiAU62cDbKYfmGZZHpzqmjIs8d/5GY6dT2iHR
rH5Jokvmw2dZL7OKDrssvamqQnw1wdh/1acxOk5jQzmvCLBhNIzTmKlDNPYPhyk7
ncJWWJh3w/cbrPad+D6qp1RF8PX51TFl/mtYnHGzHtdS6jIX/EBgHcl5JLL2bP2o
Zg6C3ZjL2sJETy6ge/L3ayx2EYRGinij4w==
-----END CERTIFICATE-----
