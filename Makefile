# 默认目标
all: theme hugo

# Hugo构建
hugo:
	hugo server -D

# 主题构建
theme:
	cd themes/efimero && bun run build && cd ../..

# 清理构建文件
clean:
	rm -rf public
	rm -rf resources/_gen
	cd themes/efimero && rm -rf node_modules
	cd ../..

# 帮助信息
help:
	@echo "可用的make目标："
	@echo "  all: 默认目标，构建 Hugo 和主题"
	@echo "  hugo: 构建 Hugo"
	@echo "  theme: 构建主题"