def load_wallets(filename):
    with open(filename, "r") as f:
        wallets = [line.strip().lower() for line in f if line.strip()]
    return list(set(wallets))  # remove duplicates


def save_wallets(filename, wallets):
    with open(filename, "w") as f:
        for w in wallets:
            f.write(f"{w}\n")


def main():
    # Load and deduplicate
    free_wallets = load_wallets("FREE")
    gtd_wallets = load_wallets("GTD")
    fcfs_wallets = load_wallets("FCFS")

    # Priority-based removal
    gtd_wallets = [w for w in gtd_wallets if w not in free_wallets]
    fcfs_wallets = [w for w in fcfs_wallets if w not in free_wallets and w not in gtd_wallets]

    # Save cleaned lists
    save_wallets("FREE_cleaned.txt", free_wallets)
    save_wallets("GTD_cleaned.txt", gtd_wallets)
    save_wallets("FCFS_cleaned.txt", fcfs_wallets)

    print(f"✅ Done!\n"
          f"FREE: {len(free_wallets)}\n"
          f"GTD: {len(gtd_wallets)}\n"
          f"FCFS: {len(fcfs_wallets)}")


if __name__ == "__main__":
    main()