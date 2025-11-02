"use client"

import { motion, useSpring, useScroll } from "framer-motion"

export default function ScrollLinked() {
    const { scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <>
            <motion.div
                id="scroll-indicator"
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 10,
                    originX: 0,
                    backgroundColor: "#ff0088",
                }}
            />
            <Content />
        </>
    )
}

/**
 * ==============   Utils   ================
 */

function Content() {
    return (
        <>
            <article style={{ maxWidth: 500, padding: "150px 20px" }}>
              <h1>CI/CD Pipeline to Deploy a Next.js App on AWS EC2 using GitHub Actions</h1>
              <h2> First things first </h2>            
              <ol>
                  <li>Set up an AWS account</li>
                  <li>Initialize a new GitHub repository</li>
                  <li> Push your Next.js app to the GitHub repository</li>
              </ol>
              <h2>Launching an EC2 Instance</h2>
              <p>Go to the EC2 Dashboard</p>
                <ul>
                 <li>Select a name for your instance</li>
                 <li>Choose Ubuntu as your operating system</li>
                 <li>Select an appropriate instance type (Since this is a next/react.js app I repeat Do-not-use-t2.micro you can only serve but not build)</li>
                 <li>Create a key pair (or use an existing one) for SSH access in any algorithm and download it</li>
                 <li>Configure the security group to allow HTTP-Port 80 and SSH-Port 22 access .</li>
                 <li>Also set inbound rules Custom TCP with port 443 and 3000</li>
                 <li>Configure storage to 16 gb (optional).</li>
                </ul>
            
                <p>
                    Finally you can launch your instance (setup-billing-alarms-too).
                </p>
                <br />
                <p>
                    Now everything's ready and once the instance is running, connect to it using SSH on your terminal.
                </p>

                <h2>Login to EC2</h2>
                <p>
                   Use this command to login to your instance:
                </p>
                <pre><code>{`ssh -i /path/key-pair-name.pem ec2-user@your-instance-public-dns`}</code></pre>
                here replace /path/key-pair-name.pem - path to downloaded key pair file & your-instance-public-dns - public DNS of your EC2 instance.
                <br />
                Also keep the key-pair in your root directory .

                <p>If this doesn't work you need to set permissions to the key-pair file using this command:</p>
                <pre><code>{`chmod 400 /path/key-pair-name.pem`}</code></pre>

                <p>Create a test folder.</p>
                <pre><code>{`mkdir test`}</code></pre>
                <p>Navigate to the test folder.</p>
                <pre><code>{`cd test`}</code></pre>

                <h2>Install Node.js and npm</h2>
                <p>
                    To run a Next.js application, you need to have Node.js and npm
                    installed on your EC2 instance. You can install them using the
                    following commands:
                </p>
                <pre><code>{`sudo apt update
sudo apt install nodejs 
sudo apt install npm`}</code></pre>

                <p>Intialise npm</p>
                <pre><code>{`npm init <package-name>-y`}</code></pre>

                <p>Install express</p>
                <pre><code>{`npm i express`}</code></pre>

                <p>Create a server.js file in the test folder</p>
                <pre><code>{`vi app.js`}</code></pre>

                <p>Paste the following code in the terminal or app.js</p>
                <pre>{`const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(\`Server is running on http://localhost:\${PORT}\`);
});`}</pre>

                <p>Save (press Esc then type :wq and hit Enter) and exit the file</p>
                <p>Run the app using the command</p>
                <pre><code>{`node app.js`}</code></pre>

                <p>Your app should be running on port 3000. You can access it by navigating to http://your-instance-public-dns:3000 in your web browser.</p>
                <p>Make sure to replace your-instance-public-dns with the actual public DNS of your EC2 instance.</p>
                <p>That's it! You have successfully deployed a Next.js app on AWS EC2 using GitHub Actions.</p>
                <p>If there's any process running on port 3000, you can stop it using the command:</p>
                <pre><code>{`lsof -i :3000`}</code></pre>
                <p>Find the PID of the process running and use the command:</p>
                <pre><code>{`kill PID`}</code></pre>
                <p>Replace PID with the actual process ID you found earlier.</p>

                <h2>Keep your App running</h2>
                <p>
                    In order to keep your app running even after you close the SSH
                    session, you can use a process manager like PM2. Install PM2
                    globally using npm:
                </p>
                <pre><code>{`sudo npm i -g pm2`}</code></pre>
                <p>Now run:</p>
                <pre><code>{`pm2 start app.js`}</code></pre>
                <p>Now even if you kill the process, PM2 will keep it running.</p>
                <p>To stop the process, use the command:</p>
                <pre><code>{`pm2 stop app.js`}</code></pre>
                <p>It'll stop the server running (kinda similar to nodemon used in development).</p>

                <h2>CI/CD</h2>
                <h3>Continuous Integration</h3>
                <p>
                    Continuous Integration (CI) is a software development practice
                    where developers frequently integrate their code changes into a
                    shared repository. Each integration is verified by an automated
                    build and tests to detect errors quickly.
                </p>

                <h3>Continuous Deployment</h3>
                <p>
                    Continuous Deployment (CD) is an extension of Continuous Integration (CI) that automatically deploys code changes to production after they pass all tests. This practice enables teams to release new features and bug fixes more frequently and with greater confidence.
                </p>

                <h2>Deploying to AWS</h2>
                <p>In this section, we will set up the deployment process to AWS EC2 using GitHub Actions.</p>
                <p>First clone your repository on the EC2 instance.</p>
                <pre><code>{`git clone your-repo-url.git`}</code></pre>
                <p>Navigate to the cloned repository.</p>
                <pre><code>{`cd your-repo-name`}</code></pre>
                <p>Build your application.</p>
                <pre><code>{`npm run build`}</code></pre>
                <pre><code>{`npm i`}</code></pre>

                <h3>Setting up SSH Keys</h3>
                <p>Create ssh keypair in test folder</p>
                <pre><code>{`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`}</code></pre>
                <p>Save the keypair as id_rsa and id_rsa.pub with/without passphrase</p>
                <p>Display the public key using the command:</p>
                <pre><code>{`cat id_rsa`}</code></pre>
                <pre><code>{`cat id_rsa | pbcopy`}</code></pre>
                <p>Copy the displayed public key</p>

                <h3>GitHub Actions</h3>
                <p>Create a .github/workflows directory in your repository created earlier.</p>
                <p>Inside the workflows directory, create a file named deploy.yml</p>

                <h3>Go to Actions secrets in settings</h3>
                <p>Add a new secret with the name <code>PRIVATE_SSH_KEY</code> and paste the copied public key as the Secret.</p>
                <p>Now Add public key</p>
                <p>Copy public ip address from your EC2 instance</p>
                <p>Add as <code>EC2_HOST</code></p>
                <pre><code>{`cat id_rsa.pub | pbcopy`}</code></pre>
                <p>Check authorized keys file using the command:</p>
                <pre><code>{`cat ~/.ssh/authorized_keys`}</code></pre>
                <pre><code>{`vi authorized_keys`}</code></pre>
                <p>Paste the copied public key and save and exit</p>
                <p>Press <code>Esc</code> then <code>:wq</code> to save and exit</p>

                <h3>Deployment</h3>
                <p>Paste the following code in deploy.yml:</p>
                <pre><code>{`name: Deploy to EC2
on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: \${{ secrets.EC2_HOST }}
          username: ubuntu
          key: \${{ secrets.PRIVATE_SSH_KEY }}
          port: 22
          script: ./deploy.sh`}</code></pre>

                <p>Create a deploy.sh file in the root directory of your repository</p>
                <pre><code>{`cd your-repo-name
git pull origin main
npm install
npm run build
npm run start`}</code></pre>

                <p>On your local machine, run the following command to test the deployment:</p>
                <pre><code>{`ls`}</code></pre>
                <pre><code>{`vi deploy.sh`}</code></pre>
                <p>Paste the following code in deploy.sh:</p>
                <pre><code>{`cd your-repo-name
git pull origin main
npm install
npm run build
npm run start`}</code></pre>
                <pre><code>{`chmod +x deploy.sh`}</code></pre>

                <p>Commit and push the changes to the main branch.</p>
                <p>If something is running on port 3000 use the command:</p>
                <pre><code>{`lsof -i :3000`}</code></pre>
                <p>Find the PID of the process running and use the command to kill it:</p>
                <pre><code>{`pm2 status`}</code></pre>
                <pre><code>{`pm2 stop app`}</code></pre>
            </article>
        </>
    )
}
