/**
 * Legible “ivy ledger” styling for cards that sit on parchment (profile, hub).
 * Avoids theme `text.secondary` (verseMuted) which fails WCAG on cream backgrounds.
 */
import type { SxProps, Theme } from "@mui/material/styles";
import { alpha } from "@mui/material/styles";
import { ivyTokens as t } from "@/theme/tokens";

/** Small caps field labels on parchment */
export const ivyFieldLabelSx: SxProps<Theme> = {
  fontSize: "0.6875rem",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: alpha(t.ink, 0.62),
  display: "block",
  mb: 0.35,
};

/** Primary description / subtitle on parchment */
export const ivyBodyMutedSx: SxProps<Theme> = {
  color: alpha(t.ink, 0.78),
  lineHeight: 1.65,
};

/** Nested study/session card — reads as a laid-in folio on the ledger */
export const ivyNestedCardSx: SxProps<Theme> = {
  bgcolor: t.parchmentCool,
  backgroundImage: `linear-gradient(180deg, ${alpha("#fff", 0.42)} 0%, transparent 28%)`,
  border: `1px solid ${alpha(t.gold, 0.38)}`,
  borderLeftWidth: 4,
  borderLeftColor: t.gold,
  borderRadius: 2,
  boxShadow: `
    inset 0 1px 0 ${alpha("#fff", 0.75)},
    0 10px 28px ${alpha("#000", 0.07)},
    0 1px 0 ${alpha(t.gold, 0.12)}
  `,
  color: t.ink,
  "&:hover": {
    boxShadow: `
      inset 0 1px 0 ${alpha("#fff", 0.85)},
      0 14px 36px ${alpha("#000", 0.1)},
      0 0 0 1px ${alpha(t.gold, 0.2)}
    `,
  },
  transition: "box-shadow 0.25s ease, transform 0.25s ease",
};

export function ivyParticipantChipSx(isCreator: boolean): SxProps<Theme> {
  return {
    height: 30,
    fontWeight: 600,
    borderRadius: 1,
    bgcolor: isCreator ? alpha(t.gold, 0.22) : alpha(t.ink, 0.06),
    border: `1px solid ${alpha(t.gold, isCreator ? 0.55 : 0.32)}`,
    color: `${t.ink}`,
    "& .MuiChip-label": {
      color: `${t.ink}`,
      fontSize: "0.8125rem",
      fontWeight: 600,
      px: 0.75,
    },
    "&:focus-visible": {
      outline: `2px solid ${alpha(t.gold, 0.9)}`,
      outlineOffset: 2,
    },
  };
}

/** Empty / helper copy on parchment surfaces */
export const ivyEmptyStateSx: SxProps<Theme> = {
  color: alpha(t.ink, 0.55),
  textAlign: "center",
};

/**
 * Outlined TextField / Select on parchment modals & forms.
 * Dark-mode theme defaults ivory input text — force ink so typed content is visible.
 */
export const ivyParchmentTextFieldSx: SxProps<Theme> = {
  "& .MuiOutlinedInput-root": {
    color: t.ink,
    backgroundColor: alpha(t.ink, 0.035),
    borderRadius: 1,
  },
  "& .MuiOutlinedInput-input, & .MuiSelect-select": {
    color: `${t.ink}`,
    "&::placeholder": {
      color: alpha(t.ink, 0.42),
      opacity: 1,
    },
  },
  /* Chrome / Edge autofill — stop pale text on cream */
  "& .MuiOutlinedInput-input:-webkit-autofill": {
    WebkitBoxShadow: `0 0 0 1000px ${t.parchment} inset`,
    WebkitTextFillColor: `${t.ink}`,
    caretColor: t.ink,
    borderRadius: "inherit",
  },
  "& .MuiOutlinedInput-input:-webkit-autofill:hover": {
    WebkitBoxShadow: `0 0 0 1000px ${t.parchmentCool} inset`,
    WebkitTextFillColor: `${t.ink}`,
  },
  "& .MuiOutlinedInput-input:-webkit-autofill:focus": {
    WebkitBoxShadow: `0 0 0 1000px ${alpha(t.parchment, 1)} inset`,
    WebkitTextFillColor: `${t.ink}`,
  },
  "& .MuiInputLabel-root": {
    color: alpha(t.ink, 0.58),
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: `${t.goldBurnished}`,
  },
  "& .MuiInputLabel-root.MuiInputLabel-shrink:not(.Mui-focused)": {
    color: alpha(t.ink, 0.72),
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: `${alpha(t.gold, 0.38)}`,
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: `${alpha(t.gold, 0.55)}`,
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: `${t.gold}`,
    borderWidth: "1px",
  },
  "& .MuiSvgIcon-root": {
    color: alpha(t.ink, 0.55),
  },
  "& .MuiIconButton-root": {
    color: alpha(t.ink, 0.62),
    "&:hover": {
      color: t.goldBurnished,
      backgroundColor: alpha(t.gold, 0.1),
    },
  },
  "& .MuiFormHelperText-root": {
    color: alpha(t.ink, 0.52),
  },
};

/** Muted helper line under primary actions on parchment (replaces `text.secondary`) */
export const ivyParchmentHelperTextSx: SxProps<Theme> = {
  color: alpha(t.ink, 0.62),
};

export const ivyParchmentAlertSx: SxProps<Theme> = {
  color: t.ink,
  backgroundColor: alpha("#c45c6a", 0.16),
  border: `1px solid ${alpha("#8f2f3d", 0.38)}`,
  "& .MuiAlert-icon": {
    color: "#8f2f3d",
  },
  "& .MuiAlert-message": {
    color: t.ink,
    fontWeight: 600,
  },
};

/** Close / accessory icon on parchment surfaces */
export const ivyParchmentIconButtonSx: SxProps<Theme> = {
  color: alpha(t.ink, 0.55),
  "&:hover": {
    color: t.goldBurnished,
    backgroundColor: alpha(t.gold, 0.1),
  },
};
