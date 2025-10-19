import { Octokit } from "@octokit/rest";
import CryptoJS from "crypto-js";

const secretKey = "https://chatgpt.com/?hints=search&openaicom_referred=true";

// Encrypt
// const encrypted = CryptoJS.AES.encrypt(token, secretKey).toString();

// console.log("Encrypted token:", encrypted);

const encryptedToken = "U2FsdGVkX18gnLCiqO1HbjNV9Ohx+Yx82tz1UJynGyahAeB2rNaRRKp5ZMnZEstPlk6Xo0y8MDN6d/pWH+UMKQ=="; // paste your encrypted string here

const bytes = CryptoJS.AES.decrypt(encryptedToken, secretKey);
const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);

const octokit = new Octokit({
    auth: decryptedToken // Secure this properly in prod
});

const GITHUB_OWNER = "Oahse";
const GITHUB_REPO = "media";
const GITHUB_BRANCH = "main";

/**
 * Convert a File object to base64 string (without prefix)
 * @param {File} file
 * @returns {Promise<string>}
 */
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = reader.result.split(",")[1]; // Remove "data:*/*;base64," prefix
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Upload a single File object to GitHub and return jsDelivr link
 * @param {File} file
 * @param {string} category
 */
async function uploadSingleFile(file, category) {
    const base64Content = await fileToBase64(file);
    const uploadPath = `${category.toLowerCase().replace(/\s+/g, "_")}/${file.name}`;

    // Check if file exists to get SHA
    let sha = null;
    try {
        const { data: existing } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: uploadPath,
        ref: GITHUB_BRANCH,
        });
        sha = existing.sha;
    } catch (error) {
        if (error.status !== 404) throw error;
    }

    const res = await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: uploadPath,
        message: `Upload ${uploadPath}`,
        content: base64Content,
        branch: GITHUB_BRANCH,
        sha,
    });

  const cdnUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_OWNER}/${GITHUB_REPO}@${GITHUB_BRANCH}/${uploadPath}`;
//   console.log(`✅ Uploaded ${file.name} → ${cdnUrl}`);
  return {cdnUrl, uploadPath};
}

/**
 * Delete a file from the GitHub repo
 * @param {string} filePath - e.g., "category/filename.ext"
 */
/**
 * Delete a single file with explicit committer info
 * @param {string} filePath - e.g. "food/banwee.webp"
 */
async function deleteSingleFile(filePath) {
  // Retrieve file SHA
  const { data: existing } = await octokit.repos.getContent({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: filePath,
    ref: GITHUB_BRANCH,
  });
  const sha = existing.sha;

  // Delete operation with committer info
  const res = await octokit.repos.deleteFile({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: filePath,
    message: `Delete ${filePath}`,
    branch: GITHUB_BRANCH,
    sha,
    committer: {
      name: "Automated Deleter",
      email: "noreply@banwee.com",
    },
  });

  return res;
}


/**
 * Upload multiple File objects to GitHub
 * @param {Array<{file: File, category: string}>} files
 */
export async function uploadMultipleFiles(files, category) {
    const results = [];

    for (const file of files) {
        try {
            const {cdnUrl, uploadPath} = await uploadSingleFile(file, category);
            results.push({ name: file.name, url:cdnUrl, githubPath:uploadPath });
        } catch (err) {
            results.push({ name: file.name, error:err });
        }
    }
    // console.log(results,'results');
    return results;
}

/**
 * Delete multiple files from GitHub repo
 * @param {Array<{ filePath: string }>} files - array of file paths (including category/folder)
 */
export async function deleteMultipleFiles(files) {
    const results = [];
    for (const filePath of files) {
        try {
            const res = await deleteSingleFile(filePath.githubPath);
            results.push({ filePath:filePath?.githubPath, success: true, res });
            // console.log(`🗑️----- Deleted: ${filePath?.githubPath}`);
        } catch (error) {
            results.push({ filePath:filePath?.githubPath, success: false, error: error.message });
            // console.error(`❌ Failed to delete ${filePath}:`, error.message);
        }
    }

    // console.log("Delete results:", results);
    return results;
}




// Example of usage: bind this to a file input on your page

// document.getElementById("fileInput").addEventListener("change", async (e) => {
//   const filesArray = Array.from(e.target.files);

//   // Map files to categories as needed, here all 'food' just example
//   const filesToUpload = filesArray.map((file) => ({
//     file,
//     category: "food", // or dynamic based on your UI
//   }));

//   const results = await uploadMultipleFiles(filesToUpload);
//   console.log("Upload Results:", results);
// });

// const filesToDelete = [
//   { filePath: "food/banwee.webp" },
//   { filePath: "drinks/cola.webp" },
// ];

// deleteMultipleFiles(filesToDelete)
//   .then(results => {
//     console.log("Delete results:", results);
//   })
//   .catch(console.error);