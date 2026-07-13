import sys

def main():
    # sys.argv[0] is the script name. Internal data starts at index 1.
    first_name = sys.argv[1]
    last_name = sys.argv[2]
    
    print(f"Hello {first_name} {last_name} from Python!")
    
    # Flush stdout to ensure Node.js receives the data instantly
    sys.stdout.flush()

if __name__ == "__main__":
    main()
