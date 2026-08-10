import zipfile, os
os.chdir("/root/new-shu-blog")
z = zipfile.ZipFile("dist.zip")
z.extractall(".")
z.close()
print("EXTRACT_OK")