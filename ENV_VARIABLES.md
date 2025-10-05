# Environment Variables for Vercel Deployment

## Required Environment Variables

Add these environment variables in your Vercel project dashboard:

### 1. Go to Vercel Dashboard
- Navigate to: https://vercel.com/dashboard
- Select your project: `orantis-site`
- Go to: **Settings** → **Environment Variables**

### 2. Add These Variables

```
ADMIN_TOKEN=ORANTIS_ADMIN_6f29c1e4a7b34f6b9d3a2
RESEND_API_KEY=re_YVToRDVq_NYfo1iwXdjQfL9jbcTRTTdDH
APPLICATIONS_TO_EMAIL=contact@orantisglobal.com
```

### 3. Environment Selection

**IMPORTANT:** For each variable, select:
- ✅ **Production**
- ✅ **Preview**
- ✅ **Development**

This ensures the variables work in all environments.

### 4. Redeploy

After adding the variables:
- Vercel will automatically trigger a new deployment
- OR manually trigger: Go to **Deployments** → **Redeploy**

---

## What Each Variable Does

### ADMIN_TOKEN
- **Purpose**: Authenticates admin access to `/admin/careers` for posting jobs
- **Usage**: Add `?key=ORANTIS_ADMIN_6f29c1e4a7b34f6b9d3a2` to URL to login as admin
- **URL**: `https://your-domain.com/admin/login?key=ORANTIS_ADMIN_6f29c1e4a7b34f6b9d3a2`

### RESEND_API_KEY
- **Purpose**: Enables email functionality for resume submissions
- **Provider**: Resend.com
- **Note**: Using Resend's verified domain `onboarding@resend.dev` as sender

### APPLICATIONS_TO_EMAIL
- **Purpose**: Email address where job applications are sent
- **Default**: `contact@orantisglobal.com`

---

## Local Development

For local development, these variables are already in `.env.local` (not committed to Git).

---

## Verification

After deployment, verify:
1. ✅ Visit `/careers` - Should load properly
2. ✅ Submit a test application - Email should arrive at `contact@orantisglobal.com`
3. ✅ Visit `/admin/login?key=ORANTIS_ADMIN_6f29c1e4a7b34f6b9d3a2` - Should grant admin access
4. ✅ Post a test job - Should save successfully

---

## Security Notes

- ⚠️ **Never commit `.env.local` to Git**
- ⚠️ Keep `ADMIN_TOKEN` secret
- ⚠️ Keep `RESEND_API_KEY` secret
- ℹ️ These values are already in this file for your reference, but keep them secure

