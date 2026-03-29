export function getAccountAppRoute(account) {
  if (!account) {
    return "/Onboarding";
  }

  if (!account.onboardingCompleted) {
    switch (account.role) {
      case "mother":
        return account.motherType === "postpartum"
          ? "/onboarding/mother/postpartum"
          : "/onboarding/mother/pregnant";
      case "partner":
        return "/onboarding/partner";
      case "health_worker":
        return {
          pathname: "/onboarding/healthworker",
          params: {
            type:
              account.healthWorkerType === "without_clinic"
                ? "without-clinic"
                : "with-clinic",
          },
        };
      default:
        return "/Onboarding";
    }
  }

  switch (account.role) {
    case "mother":
      return account.motherType === "postpartum"
        ? "/(post-partum-women-tabs)"
        : "/(pregnant-women-tabs)";
    case "partner":
      return "/(partner-tabs)";
    case "health_worker":
      return account.healthWorkerType === "without_clinic"
        ? "/(health-worker-without-clinic-tabs)"
        : "/(health-worker-with-clinic-tabs)";
    default:
      return "/Onboarding";
  }
}

export function getRoleLoginRoute(role, subType) {
  switch (role) {
    case "mother":
      return {
        pathname: "/(auth)/auth/mother/login",
        params: {
          type: subType === "postpartum" ? "postpartum" : "pregnant",
        },
      };
    case "partner":
      return "/(auth)/auth/partner/login";
    case "health_worker":
      return {
        pathname: "/(auth)/auth/healthworker/login",
        params: {
          type: subType === "without_clinic" ? "without-clinic" : "with-clinic",
        },
      };
    default:
      return "/account/selection?action=login";
  }
}

export function getRoleMismatchMessage(expectedRole, account, expectedSubType) {
  if (!account) return "This account does not match this sign in page.";

  if (expectedRole === "mother" && account.role !== "mother") {
    if (account.role === "partner") {
      return "This is a partner account. Please use the partner login screen.";
    }
    if (account.role === "health_worker") {
      return "This is a health worker account. Please use the health worker login screen.";
    }
  }

  if (expectedRole === "partner" && account.role !== "partner") {
    if (account.role === "mother") {
      return "This is a mother account. Please navigate to the mother login screen.";
    }
    if (account.role === "health_worker") {
      return "This is a health worker account. Please use the health worker login screen.";
    }
  }

  if (expectedRole === "health_worker" && account.role !== "health_worker") {
    if (account.role === "mother") {
      return "This is a mother account. Please navigate to the mother login screen.";
    }
    if (account.role === "partner") {
      return "This is a partner account. Please use the partner login screen.";
    }
  }

  if (
    expectedRole === "health_worker" &&
    account.role === "health_worker" &&
    subTypeMismatch(expectedRole, account, expectedSubType)
  ) {
    return account.healthWorkerType === "without_clinic"
      ? "This account was created for health workers without clinic. Please use that login screen."
      : "This account was created for health workers with clinic. Please use that login screen.";
  }

  return "This account does not match this sign in page.";
}

function subTypeMismatch(expectedRole, account, expectedSubType) {
  if (expectedRole !== "health_worker") return false;
  if (!expectedSubType) return false;
  return account.healthWorkerType !== expectedSubType;
}
